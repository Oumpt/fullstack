import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    const products = [
        {
            id: 1,
            name: 'แชมพู สูตรนุ่มลิ้น',
            price: '$19.99',
            image: 'https://magicstudio.com/blog/content/images/2023/10/props-product-photography.webp',
        },
        {
            id: 2,
            name: 'เสื้อยืดตรา หนังเหนียว',
            price: '$49.99',
            image: 'https://inwfile.com/s-cx/yg1pby.jpg',
        },
        {
            id: 3,
            name: 'กางเกง ขาสั่น',
            price: '$39.99',
            image: 'https://media.allonline.7eleven.co.th/pdmain/542972-02-allonline-fs.jpg',
        },
    ]

    return NextResponse.json({
        data : products
    })
}