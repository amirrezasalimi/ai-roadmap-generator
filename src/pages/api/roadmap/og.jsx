import OgImage from "@/shared/components/og-image";
import { ImageResponse } from '@vercel/og';
export const config = {
    runtime: 'edge',
};

export default function handler(req) {
    const { searchParams } = new URL(req.url);
    const title = `${searchParams.get("title")}`.slice(0, 100);
    return new ImageResponse(
        (
            <OgImage title={title} />
        ),
        {
            width: 600,
            height: 300,
        },
    );
}