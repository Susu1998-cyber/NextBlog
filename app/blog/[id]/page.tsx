import Image from "next/image";

async function getPost(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
        cache: "no-store",
    });

    const data = await res.json();
    return data;
}

export default async function BlogDetail({ params }: any) {
    const post = await getPost(params.id);

    if (!post) return <p className="p-10 text-center">Post not found</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
                {post.title}
            </h1>

            <div className="text-sm text-gray-500 mb-6">
                {post.category} • {post.date}
            </div>

            <div className="relative w-full h-[400px] mb-8">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-xl"
                />
            </div>

            <p className="text-lg leading-8 text-gray-700 whitespace-pre-line">
                {post.description}
            </p>
        </div>
    );
}