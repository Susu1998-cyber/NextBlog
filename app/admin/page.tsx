// "use client";

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";

// export default function AdminPage() {
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     category: "",
//     image: "",
//   });

//   const fetchBlogs = async () => {
//     const res = await fetch("/api/blog");
//     const data = await res.json();
//     if (data.success) setBlogs(data.data);
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImage = (e: any) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm({ ...form, image: reader.result as string });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
//       const method = editingId ? "PUT" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success(editingId ? "Blog updated!" : "Blog created!");
//         fetchBlogs();

//         setForm({ title: "", description: "", category: "", image: "" });
//         setEditingId(null);
//       } else {
//         toast.error(data.error);
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }

//     setLoading(false);
//   };

//   const handleEdit = (blog: any) => {
//     setForm({
//       title: blog.title,
//       description: blog.description,
//       category: blog.category,
//       image: blog.image || "",
//     });
//     setEditingId(blog._id);

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;

//     const res = await fetch(`/api/blog/${deleteId}`, {
//       method: "DELETE",
//     });

//     const data = await res.json();

//     if (data.success) {
//       toast.success("Deleted successfully");
//       fetchBlogs();
//     } else {
//       toast.error(data.error);
//     }

//     setDeleteId(null);
//   };

//   return (
//     <>
//       <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

//         {/* HEADER */}
//         <div>
//           <h1 className="text-3xl font-serif font-bold tracking-tight">
//             Admin Dashboard
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Create, edit and manage your blog posts
//           </p>
//         </div>

//         {/* FORM */}
//         <Card className="rounded-2xl border border-border/60 shadow-sm">
//           <CardContent className="p-6 space-y-6">

//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">
//                 {editingId ? "Edit Blog" : "Create New Blog"}
//               </h2>

//               {editingId && (
//                 <Button
//                   variant="ghost"
//                   onClick={() => {
//                     setEditingId(null);
//                     setForm({
//                       title: "",
//                       description: "",
//                       category: "",
//                       image: "",
//                     });
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               )}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">

//               <Input
//                 name="title"
//                 placeholder="Blog title"
//                 value={form.title}
//                 onChange={handleChange}
//                 required
//               />

//               <select
//                 name="category"
//                 value={form.category}
//                 onChange={handleChange}
//                 className="w-full border border-border rounded-lg p-3 bg-background"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 <option value="AI Updates">AI Updates</option>
//                 <option value="Tech Updates">Tech Updates</option>
//                 <option value="Digital Updates">Digital Updates</option>
//               </select>

//               <Textarea
//                 name="description"
//                 placeholder="Write your blog content..."
//                 value={form.description}
//                 onChange={handleChange}
//                 rows={5}
//                 required
//               />

//               <div className="space-y-2">
//                 <Input type="file" onChange={handleImage} />

//                 {form.image && (
//                   <img
//                     src={form.image}
//                     className="w-full max-h-60 object-cover rounded-xl border"
//                   />
//                 )}
//               </div>

//               <Button className="w-full" disabled={loading}>
//                 {loading
//                   ? "Saving..."
//                   : editingId
//                     ? "Update Blog"
//                     : "Publish Blog"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* BLOG LIST */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">Your Blogs</h2>

//           {blogs.length === 0 && (
//             <p className="text-muted-foreground text-sm">
//               No blogs created yet.
//             </p>
//           )}

//           <div className="grid md:grid-cols-2 gap-5">
//             {blogs.map((blog) => (
//               <Card
//                 key={blog._id}
//                 className="rounded-2xl border border-border/60 hover:shadow-md transition"
//               >
//                 <CardContent className="p-4 space-y-3">

//                   {blog.image && (
//                     <img
//                       src={blog.image}
//                       className="w-full h-40 object-cover rounded-lg"
//                     />
//                   )}

//                   <div>
//                     <h3 className="font-semibold text-lg line-clamp-1">
//                       {blog.title}
//                     </h3>
//                     <p className="text-xs text-muted-foreground">
//                       {blog.category}
//                     </p>
//                   </div>

//                   <div className="flex justify-between items-center">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleEdit(blog)}
//                     >
//                       Edit
//                     </Button>

//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => setDeleteId(blog._id)}
//                     >
//                       Delete
//                     </Button>
//                   </div>

//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* DELETE MODAL */}
//       <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Delete Blog</DialogTitle>
//           </DialogHeader>

//           <p className="text-sm text-muted-foreground">
//             This action cannot be undone. Are you sure you want to delete this blog?
//           </p>

//           <DialogFooter className="mt-4">
//             <Button variant="outline" onClick={() => setDeleteId(null)}>
//               Cancel
//             </Button>

//             <Button variant="destructive" onClick={handleDelete}>
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type Blog = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
};

export default function AdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
  });

  const fetchBlogs = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    if (data.success) setBlogs(data.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(editingId ? "Blog updated!" : "Blog created!");
        fetchBlogs();

        setForm({ title: "", description: "", category: "", image: "" });
        setEditingId(null);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const handleEdit = (blog: Blog) => {
    setForm({
      title: blog.title,
      description: blog.description,
      category: blog.category,
      image: blog.image || "",
    });
    setEditingId(blog._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const res = await fetch(`/api/blog/${deleteId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Deleted successfully");
      fetchBlogs();
    } else {
      toast.error(data.error);
    }

    setDeleteId(null);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Create, edit and manage your blog posts
          </p>
        </div>

        {/* FORM */}
        <Card className="rounded-2xl border border-border/60 shadow-sm">
          <CardContent className="p-6 space-y-6">

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {editingId ? "Edit Blog" : "Create New Blog"}
              </h2>

              {editingId && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setEditingId(null);
                    setForm({
                      title: "",
                      description: "",
                      category: "",
                      image: "",
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <Input
                name="title"
                placeholder="Blog title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-border rounded-lg p-3 bg-background"
                required
              >
                <option value="">Select Category</option>
                <option value="AI Updates">AI Updates</option>
                <option value="Tech Updates">Tech Updates</option>
                <option value="Digital Updates">Digital Updates</option>
              </select>

              <Textarea
                name="description"
                placeholder="Write your blog content..."
                value={form.description}
                onChange={handleChange}
                rows={5}
                required
              />

              <div className="space-y-2">
                <Input type="file" onChange={handleImage} />

                {form.image && (
                  <img
                    src={form.image}
                    className="w-full max-h-60 object-cover rounded-xl border"
                  />
                )}
              </div>

              <Button className="w-full" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingId
                    ? "Update Blog"
                    : "Publish Blog"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* BLOG LIST */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Blogs</h2>

          {blogs.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No blogs created yet.
            </p>
          )}

          <div className="grid md:grid-cols-2 gap-5">
            {blogs.map((blog) => (
              <Card
                key={blog._id}
                className="rounded-2xl border border-border/60 hover:shadow-md transition"
              >
                <CardContent className="p-4 space-y-3">

                  {blog.image && (
                    <img
                      src={blog.image}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  )}

                  <div>
                    <h3 className="font-semibold text-lg line-clamp-1">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {blog.category}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(blog._id)}
                    >
                      Delete
                    </Button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>

      {/* DELETE MODAL */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            This action cannot be undone. Are you sure you want to delete this blog?
          </p>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>

            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}