import { weekDays } from "@/components/ui/datepicker/date";
import { dateDisplay } from "@vert-capital/design-system-ui";

export class Event {
  id: number;
  event_data: string;
  event_title: string;
  event_type: {
    color: string;
    id: number;
  };
  emission: {
    external_emission_id: number;
    _emission_code_name: string;
    principal_responsable_email: string;
    principal_responsable_name: string;
    principal_responsable_area: string;
    responsibles: { name: string; area: string; email: string }[];
    responsible: string[];
  };
  patrimony: {
    external_patrimony_id: number;
    number: number;
  };
  series: {
    name: string;
    external_series_id: number;
    type: string;
    patrimony: number;
    priority: number;
  };
  json: {
    responsible_obligation: {
      name: string;
      area: string;
      email: string;
    };
    status: string;
  };
  application: {
    id: number;
    slug: string;
    name: string;
  };
  url: {
    ops: string;
    obligation: string;
    calendar_event: string;
    token: string;
  };

  constructor(data: any) {
    this.id = data.id;
    this.event_data = data.event_data;
    this.event_title = data.event_title;
    this.event_type = data.event_type;
    this.emission = data.emission;
    this.patrimony = data.patrimony;
    this.series = data.series;
    this.json = data.json;
    this.application = data.application;
    this.url = data.urls;
  }
  get color(): string {
    return this.event_type?.color;
  }
  get patrimony_formatted(): string {
    if (this.emission) {
      return (
        this.emission?._emission_code_name +
        (this.patrimony ? " - " + this.patrimony?.number : "")
      );
    }
    return "";
  }

  get series_formatted(): string {
    if (this.series) {
      return `#${this.series?.external_series_id} | ${
        this.series?.priority
      } - ${
        this.series?.name + (this.series?.type ? " - " + this.series?.type : "")
      }`;
    }
    return "";
  }
  get day_date(): string {
    return (
      weekDays[new Date(this.event_data).getDay() + 1] +
      ". " +
      dateDisplay(this.event_data)
    );
  }
  get responsable(): { name: string; area: string; email: string } {
    return this.json?.responsible_obligation &&
      this.json?.responsible_obligation.name != ""
      ? {
          name: this.json?.responsible_obligation.name,
          area: this.json?.responsible_obligation.area,
          email:
            this.json?.responsible_obligation.email ||
            "Não possui e-mail cadastrado",
        }
      : {
          name: this.emission?.principal_responsable_name,
          area: this.emission?.principal_responsable_area,
          email:
            this.emission?.principal_responsable_email ||
            "Não possui e-mail cadastrado",
        };
  }
  get coresponsable(): { name: string; area: string; email: string }[] {
    const coResponsible = this.emission?.responsibles.filter(
      (main) => main.name != this.responsable?.name
    );
    const resposta =
      this.emission?.principal_responsable_name &&
      this.responsable?.name != this.emission?.principal_responsable_name
        ? [
            {
              name: this.emission?.principal_responsable_name,
              area: this.emission?.principal_responsable_area,
              email:
                this.emission?.principal_responsable_email ||
                "Não possui e-mail cadastrado",
            },
            ...coResponsible,
          ]
        : coResponsible;
    return resposta || [];
  }
  get status(): string {
    return this.json?.status;
  }
  get application_name(): string {
    return this.application?.name;
  }
  getInitials(name: string): string {
    if (!name) return "";
    const name2 = name
      .split(" ")
      .map((n) => n[0])
      .join("");
    return name2;
  }
  get link_blank(): string {
    if (this.application?.slug === "ops") {
      return (
        this.url.ops + "/patrimony/" + this.patrimony?.external_patrimony_id
      );
    } else if (this.application?.slug === "obligation") {
      return this.url.obligation;
    }

    return "";
  }
}
