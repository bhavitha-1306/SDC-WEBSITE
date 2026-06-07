import {
  MOCK_EVENTS,
  MOCK_TEAM_MEMBERS,
  MOCK_HIGHLIGHTS,
  MOCK_BLOG_POSTS,
  MOCK_PARTNERS,
  MOCK_GALLERY_IMAGES,
} from "./mockData";

export function getMockSupabaseClient() {
  const getTableData = (table: string): any[] => {
    switch (table) {
      case "events":
      case "v_events_public":
      case "v_upcoming_events":
      case "v_past_events": {
        const today = new Date().toISOString().slice(0, 10);
        const items = MOCK_EVENTS.map((e) => {
          const is_past = e.event_date ? e.event_date < today : false;
          return { ...e, is_past };
        });
        if (table === "v_upcoming_events") {
          return items.filter((e) => !e.event_date || e.event_date >= today);
        }
        if (table === "v_past_events") {
          return items.filter((e) => e.event_date && e.event_date < today);
        }
        return items;
      }
      case "team_members":
      case "v_team_public":
        return MOCK_TEAM_MEMBERS;
      case "highlights":
      case "v_highlights_public":
        return MOCK_HIGHLIGHTS;
      case "blog_posts":
      case "v_blog_public":
        return MOCK_BLOG_POSTS;
      case "partners":
      case "v_partners_public":
        return MOCK_PARTNERS;
      case "gallery_images":
      case "v_gallery_public":
        return MOCK_GALLERY_IMAGES;
      case "admin_emails":
        return [{ email: "goutipavankumar1249@gmail.com", role: "admin" }];
      default:
        return [];
    }
  };

  class MockQueryBuilder {
    private table: string;
    private filters: Array<(item: any) => boolean> = [];
    private singleRow = false;
    private maybeSingleRow = false;

    constructor(table: string) {
      this.table = table;
    }

    select(columns?: string, options?: any) {
      return this;
    }

    eq(column: string, value: any) {
      this.filters.push((item) => item[column] === value);
      return this;
    }

    is(column: string, value: any) {
      this.filters.push((item) => item[column] === value);
      return this;
    }

    lt(column: string, value: any) {
      this.filters.push((item) => item[column] < value);
      return this;
    }

    gt(column: string, value: any) {
      this.filters.push((item) => item[column] > value);
      return this;
    }

    or(filters: string) {
      return this;
    }

    order(column: string, options?: any) {
      return this;
    }

    maybeSingle() {
      this.maybeSingleRow = true;
      return this;
    }

    single() {
      this.singleRow = true;
      return this;
    }

    insert(data: any) {
      return this;
    }

    update(data: any) {
      return this;
    }

    delete() {
      return this;
    }

    // Support for being awaited directly
    async then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any): Promise<any> {
      try {
        let items = getTableData(this.table);
        for (const filter of this.filters) {
          items = items.filter(filter);
        }

        let result: any = items;
        if (this.singleRow) {
          result = items[0] || null;
        } else if (this.maybeSingleRow) {
          result = items[0] || null;
        }

        const res = { data: result, error: null };
        if (onfulfilled) {
          return onfulfilled(res);
        }
        return res;
      } catch (err: any) {
        const res = { data: null, error: err };
        if (onrejected) {
          return onrejected(res);
        }
        return res;
      }
    }
  }

  return {
    from(table: string) {
      return new MockQueryBuilder(table);
    },
    auth: {
      async getUser() {
        return { data: { user: null }, error: null };
      },
      async getSession() {
        return { data: { session: null }, error: null };
      },
    },
    storage: {
      from(bucket: string) {
        return {
          getPublicUrl(path: string) {
            return { data: { publicUrl: path } };
          },
        };
      },
    },
  };
}
