export interface JSON {
    items: Structure[];
}
export interface Structure {
    id: string;
    unitPrice: number;
    specialPrice: {
        quantity: number;
        price: number;
    };
}
export interface Cart extends Structure {
    count: number;
}
