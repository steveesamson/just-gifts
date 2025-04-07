import { useCallback, useState, useMemo } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { ref, getDownloadURL, uploadBytesResumable, getStorage, deleteObject } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "<apiKey>",
    authDomain: "<authDomain>",
    projectId: "<projectId>",
    storageBucket: "<storageBucket>",
    messagingSenderId: "<messagingSenderId>",
    appId: "<appId>"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const store = getStorage(app);
const storage = (name) => ref(store, `images/${name}`);

// Custom hook to handle image upload/delete
// From Firebase storage
export const useUpload = (onDone) => {

    const [percent, setProgresspercent] = useState(0);
    const [uploading, setUploading] = useState(false);
    // const [imageName, setImageName] = useState("");

    const deleteFile = useCallback((imageName) => {
        const storageRef = storage(imageName);
        // Delete the file
        deleteObject(storageRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }, []);

    const uploadFile = useCallback((file, preferName) => {
        const ext = file.name.split(".").pop();
        // Concoct a name
        const name = preferName ? preferName : new Date().getMilliseconds() + `.${ext}`;
        // create storage ref
        const storageRef = storage(name);
        // Init upload
        const uploadTask = uploadBytesResumable(storageRef, file);
        setUploading(true);
        // Bind event listener for state_changed
        uploadTask.on("state_changed",
            (snapshot) => {
                // Get and update progress
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                // Error occurred
                onDone({ error });
                setUploading(false);
            },
            () => {
                // Retrieve file uri
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    onDone({ data: { productImage: downloadURL, imageName: name, newImage: name } });
                    setUploading(false);
                });
            }
        );
    }, [onDone]);
    return useMemo(() => ({ uploadFile, deleteFile, percent, uploading }), [uploadFile, deleteFile, percent, uploading]);
}
