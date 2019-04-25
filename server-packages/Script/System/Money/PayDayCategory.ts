export class PayDayCategory {
    readonly name: string;
    readonly tax: number;
    readonly incomeCategory: boolean;


    constructor(name: string, tax: number, incomeCategory: boolean) {
        this.name = name;
        this.tax = tax;
        this.incomeCategory = incomeCategory;

        PayDayCategory.CATEGORIES_BY_NAME[name] = this;
    }

    static readonly CATEGORIES_BY_NAME: {[name: string]: PayDayCategory} = {};
    static readonly TAXES = new PayDayCategory("Steuern", 0, false);
    static readonly JOB = new PayDayCategory("Jobgehalt", 0.25, true);
    static readonly SALERY = new PayDayCategory("Grundgehalt", 0, true);
    static readonly RENT = new PayDayCategory("Miete", 0, false);
}

export function getCategoryByName(category: string): PayDayCategory {
    return PayDayCategory.CATEGORIES_BY_NAME[category];
}

