



// import Image from "next/image";

// type Post = {
//     _id: string;
//     title: string;
//     description: string;
//     image: string;
//     category: string;
//     date: string;
// };

// async function getPost(id: string): Promise<Post | null> {
//     const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
//         {
//             cache: "no-store",
//         }
//     );

//     if (!res.ok) return null;

//     const data = await res.json();
//     return data;
// }

// export default async function BlogDetail({
//     params,
// }: {
//     params: Promise<{ id: string }>;
// }) {
//     const { id } = await params;
//     const post = await getPost(id);

//     if (!post) {
//         return <p className="p-10 text-center">Post not found</p>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto px-4 py-16">
//             <h1 className="text-3xl md:text-5xl font-bold mb-6">
//                 {post.title}
//             </h1>

//             <div className="text-sm text-gray-500 mb-6">
//                 {post.category} • {post.date}
//             </div>

//             <div className="relative w-full h-[400px] mb-8">
//                 <Image
//                     src={post.image || "/placeholder.jpg"}
//                     alt={post.title}
//                     fill
//                     className="object-cover rounded-xl"
//                 />
//             </div>

//             <p className="text-lg leading-8 text-gray-700 whitespace-pre-line">
//                 {post.description}
//             </p>
//         </div>
//     );
// }


type Post = {
    id: string; // ✅ NOT _id anymore
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
};

async function getPost(id: string): Promise<Post | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const json = await res.json();

        return json.data; // ✅ IMPORTANT
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

export default async function BlogDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const post = await getPost(id);

    if (!post) {
        return <p className="p-10 text-center">Post not found</p>;
    }

    const isBase64 = post.image?.startsWith("data:image");
    const isExternal = post.image?.startsWith("http");

    const imageSrc =
        isBase64 || isExternal
            ? post.image
            : "/placeholder.jpg";

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {post.title}
            </h1>

            <div className="text-sm text-gray-500 mb-6">
                {post.category} • {post.date}
            </div>

            <div className="w-full mb-8">
                <img
                    src={imageSrc}
                    alt={post.title || "Blog image"}
                    className="w-full h-[400px] object-cover rounded-xl"
                />
            </div>

            <p className="text-lg leading-8 text-gray-700 whitespace-pre-line">
                {post.description}
            </p>
        </div>
    );
}