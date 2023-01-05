export class ImageLoader {
    static async loadImage(link: string): Promise<string | undefined> {
        try {
            const response = await fetch(link, { cache: 'force-cache' });
            if (!response.ok) return;
            const blob = await response.blob();
            const src = URL.createObjectURL(blob);
            return src;
        } catch (e) {
            console.log(e);
        }
    }
}
