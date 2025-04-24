const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Happy Customer",
      content:
        "I was amazed by the quality of service. The car I purchased exceeded all my expectations and the staff was incredibly helpful throughout the entire process.",
      avatar: "https://i.postimg.cc/PqjGfRVF/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Repeat Buyer",
      content:
        "This is my third purchase from this platform and I couldn't be happier. The selection is unmatched and the prices are very competitive.",
      avatar:
        "https://i.postimg.cc/PqjGfRVF/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Jessica Williams",
      title: "First-time Buyer",
      content:
        "As someone who was nervous about buying a car online, I found the process to be seamless and transparent. The detailed descriptions and photos really helped.",
      avatar: "https://i.postimg.cc/PqjGfRVF/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
      rating: 4,
    },
  ];

  const BlogPosts = [
    {
      id: 1,
      title: "Top 5 Electric Cars to Consider in 2025",
      excerpt:
        "With the growing popularity of electric vehicles, here are our top picks for eco-friendly driving this year.",
      image:
        "https://i.postimg.cc/pXWtz42N/3-BUGATTI-W16-Mistral-World-Record.webp",
      date: "April 15, 2025",
      author: "Alex Thompson",
    },
    {
      id: 2,
      title: "Essential Maintenance Tips for Your Luxury Vehicle",
      excerpt:
        "Keep your premium car running smoothly with these professional maintenance recommendations.",
      image: "https://i.postimg.cc/DftxKbMx/download.jpg",
      date: "April 8, 2025",
      author: "Rachel Kim",
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Testimonials Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 p-6 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-4">
                  {/* Stars based on rating */}
                  <div className="flex mr-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Latest from Our Blog
            </h2>
            <a
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              View All Posts
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {BlogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {post.date} • By {post.author}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a
                    href={`/blog/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    Read More
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
