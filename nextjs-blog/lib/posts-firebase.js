import { db } from './firebase';
import { collection, getDocs, where, query, documentId } from 'firebase/firestore';

export async function getSortedPostsData() {

    const myCollectionRef = collection(db, "posts");
    const querySnapshot = await getDocs(myCollectionRef);
    const jsonObj = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));

    jsonObj.sort(function (a, b) 
        {
            return a.title.localeCompare(b.title);
        }
    );

    // Transform the data to ensure id is a string and return only needed fields
    return jsonObj.map(item => {
            return {
                id: item.id.toString(),  // Convert id to string for consistency
                title: item.title,
                date: item.date,
                tags: item.tags
            }
        }
    );

}

export async function getAllPostIds() {

    const myCollectionRef = collection(db, "posts");
    const querySnapshot = await getDocs(myCollectionRef);
    const jsonObj = querySnapshot.docs.map(doc => ({ id: doc.id }));

    return jsonObj.map(item => 
        {
            return {
                params: {
                    id: item.id.toString()  // Convert id to string for URL parameter ( I think I can do id: doc.title)
                }
            }
        }
    );

}

export async function getPostData(id) {

    const myCollectionRef = collection(db, "posts");
    const searchQuery = query(
        myCollectionRef,
        where(
            documentId(),
            "==",
            id
        )
    );

    const querySnapshot = await getDocs(searchQuery);
    const jsonObj = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data() }));

        if (jsonObj.length === 0)  
            {
                return {
                    id: 'id',
                    title: 'error',
                    date: 'error',
                    contenHtml: "<p><strong>>:(</strong></p>",
                    tags: 'loser'
                };
            }
    else {
        // Return the first (and should be only) matching post
        return jsonObj[0];
    }
}