import { weekDays } from "@/components/ui/datepicker/date";
import { dateDisplay } from "@vert-capital/design-system-ui";

export abstract class BasicEvent {
  id: number;
  event_data: string;
  event_title: string;
  application: {
    id: number;
    slug: string;
    name: string;
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
  emission: {
    external_emission_id: number;
    _emission_code_name: string;
    principal_responsable_email: string;
    principal_responsable_name: string;
    principal_responsable_area: string;
    responsibles: { name: string; area: string; email: string }[];
    responsible: string[];
  };
  event_type: {
    color: string;
    id: number;
  };
  json: {
    responsible_obligation: {
      name: string;
      area: string;
    };
    status: string;
  };
  obligation?: number;

  constructor(data: any) {
    this.id = data.id;
    this.event_data = data.event_data;
    this.event_title = data.event_title;
    this.application = data.application;
    this.patrimony = data.patrimony;
    this.series = data.series;
    this.emission = data.emission;
    this.event_type = data.event_type;
    this.json = data.json;
    this.obligation = data.obligation;
  }
  get status(): string {
    return this.json?.status;
  }
  get application_name(): string {
    return this.application?.name;
  }
  get color(): string {
    return this.event_type?.color;
  }
  get day_date(): string {
    return (
      weekDays[new Date(this.event_data).getDay() + 1] +
      ". " +
      dateDisplay(this.event_data)
    );
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
}

export class Event extends BasicEvent {
  url: {
    ops: string;
    obligation: string;
    calendar_event: string;
    token: string;
  };
  json: {
    responsible_obligation: {
      name: string;
      area: string;
      email: string;
    };
    status: string;
  };

  constructor(data: any) {
    super(data);
    this.url = data.urls;
    this.json = data.json;
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
  getInitials(name: string): string {
    if (!name) return "";
    name = name.replace(/  +/g, " ");
    const name2 = name
      .split(" ")
      .map((n, i) => (i <= 1 && n[0] ? n[0] : ""))
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

export class EventMiniCalendar extends BasicEvent {
  constructor(data: any) {
    super(data);
  }

  get responsible_obligation(): string {
    return this.json?.responsible_obligation?.name
      ? this.json?.responsible_obligation?.name + "(Responsável)"
      : "";
  }

  get responsable_formated(): string {
    const coresponsableName = this.getCoresponsable().map((item) => item.name);
    if (this.json.responsible_obligation) {
      return (
        this.json.responsible_obligation.name +
        " (Responsável)" +
        (this.emission ? `, ${coresponsableName.join(", ")}` : "")
      );
    } else {
      return this.emission
        ? this.emission?.principal_responsable_name +
            " (Responsável), " +
            coresponsableName.join(", ")
        : "";
    }
  }

  getCoresponsable(): IResponsible[] {
    const coResponsible = this.emission?.responsibles.filter(
      (main) => main.name != this.getResponsable().name
    );
    const response =
      this.emission?.principal_responsable_name &&
      this.getResponsable().name != this.emission?.principal_responsable_name
        ? [
            {
              name: this.emission?.principal_responsable_name,
              area: this.emission?.principal_responsable_area,
            },
            ...coResponsible,
          ]
        : coResponsible;
    return response || [];
  }

  getResponsable(): IResponsible {
    return this.json.responsible_obligation &&
      this.json.responsible_obligation.name != ""
      ? {
          name: this.json.responsible_obligation.name,
          area: this.json.responsible_obligation.area,
        }
      : {
          name: this.emission?.principal_responsable_name,
          area: this.emission?.principal_responsable_area,
        };
  }
}

export interface IResponsible {
  name: string;
  area: string;
}
