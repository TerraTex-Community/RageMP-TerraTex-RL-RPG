export class PayDayCategory {
    readonly name: string;
    readonly tax: number;
    readonly incomeCategory: boolean;


    constructor(name: string, tax: number, incomeCategory: boolean) {
        this.name = name;
        this.tax = tax;
        this.incomeCategory = incomeCategory;

        PayDayCategory.CategoriesByName[name] = this;
    }

    static readonly CategoriesByName = {};
    static readonly Taxes = new PayDayCategory("Steuern", 0, false);
    static readonly Job = new PayDayCategory("Jobgehalt", 0.25, true);
    static readonly Salery = new PayDayCategory("Grundgehalt", 0, true);
    static readonly Rent = new PayDayCategory("Miete", 0, false);
}

export function getCategoryByName(category: string) {
    return PayDayCategory.CategoriesByName[category];
}

