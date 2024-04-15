import { createUploadthing } from 'uploadthing/next';

import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';

const uploadBuilder = createUploadthing();

const auth = async () => {
    return await getServerSession(authConfig);
};

export const UTRouter = {
    imageUploader: uploadBuilder({ image: { maxFileSize: '4MB' } })
        .middleware(async () => {
            const session = await auth();

            if (!session) throw new Error('Unauthorized');
            return { userEmail: session.user?.email };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log('Upload complete for user: ', metadata.userEmail);
            console.log('File url: ', file.url);
            return { uploadedBy: metadata.userEmail };
        }),
};
