import React, { JSX } from "react";

import { Cascader, CascaderOption } from "@/components/cascader/Cascader";
import { categories, services } from "@/data/mockData";
import { formatPrice } from "@/lib";
import { AppointmentFormProps, Category, Service } from "@/types";

function buildCascaderOptions(
  categories: Category[],
  services: Service[]
): CascaderOption[] {
  const categoryMap = new Map<number | null, Category[]>();

  categories.forEach((category) => {
    const parent = category.parentId;
    if (!categoryMap.has(parent)) {
      categoryMap.set(parent, []);
    }
    categoryMap.get(parent)?.push(category);
  });

  const buildOptions = (parentId: number | null): CascaderOption[] => {
    const cats = categoryMap.get(parentId) || [];
    return cats
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => {
        if (category.isLeaf) {
          const categoryServices = services.filter(
            (service) => service.categoryId === category.id && service.isActive
          );

          if (categoryServices.length > 0) {
            const service = categoryServices[0];
            return {
              value: `service-${service.id}`,
              label: `${category.name} - ${formatPrice(service.price)}`,
              isLeaf: true,
            };
          }
        }

        const option: CascaderOption = {
          value: category.id.toString(),
          label: category.name,
        };

        const children = buildOptions(category.id);
        if (children.length > 0) {
          option.children = children;
        }

        return option;
      });
  };

  return buildOptions(null);
}

export const ServiceInput = ({
  formData,
  onChange,
}: AppointmentFormProps): JSX.Element => {
  const cascaderOptions = React.useMemo(
    () => buildCascaderOptions(categories, services),
    []
  );

  const handleServiceChange = (values: string[]) => {
    const serviceValue = values[values.length - 1];
    if (serviceValue?.startsWith("service-")) {
      const serviceId = parseInt(serviceValue.replace("service-", ""));
      const service = services.find((s) => s.id === serviceId);
      if (service) {
        onChange("serviceId", service.id.toString());
      }
    }
  };

  const getCascaderValue = () => {
    if (!formData.serviceId) return [];

    const service = services.find(
      (s) => s.id.toString() === formData.serviceId
    );
    if (!service) return [];

    const category = categories.find((c) => c.id === service.categoryId);
    if (!category) return [];

    const path: string[] = [];
    let currentCategory: Category | undefined = category;

    while (currentCategory) {
      path.unshift(currentCategory.id.toString());
      currentCategory = categories.find(
        (c) => c.id === currentCategory?.parentId
      );
    }

    path[path.length - 1] = `service-${service.id}`;
    return path;
  };

  return (
    <Cascader
      label="Servicio *"
      value={getCascaderValue()}
      onChange={handleServiceChange}
      options={cascaderOptions}
      placeholder="Seleccionar servicio"
    />
  );
};
