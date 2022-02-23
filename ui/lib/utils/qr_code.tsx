import qrcode from 'qrcode-npm';

export class QRCode {
    public static generate({ text = '', size = 4 }: { text?: string; size?: number }) {
        const qr = qrcode.qrcode(4, 'M');
        qr.addData(text);
        qr.make();

        const image = qr.createImgTag(size);
        return <span dangerouslySetInnerHTML={{ __html: image }}></span>;
    }
}
