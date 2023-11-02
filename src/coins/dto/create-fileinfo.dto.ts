
export class CreateFileInfoDTO{

    id: number;
    CreatedAt: Date;
    fieldname: string;	//files 
    originalname:string; //"jpg.jpeg",
    encoding: string; //"7bit",
    mimetype: string; //"image/jpeg",
    destination: string; //"./upload",
    filename: string; //"files-1698858353186-975370700.jpeg",
    path: string; //"upload/files-1698858353186-975370700.jpeg",
    size: number;//5800
    coinId: number;

}