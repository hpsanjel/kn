"use client";
import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { Parallax } from "react-parallax";

export default function Testimonials() {
	const [testimonials, setTestimonials] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				const response = await fetch("/api/testimonials");
				const data = await response.json();

				if (data.success) {
					setTestimonials(data.testimonials);
				} else {
					console.error("Failed to fetch events:", data.error);
				}
			} catch (error) {
				console.error("Error fetching events:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTestimonials();
	}, []);

	if (loading) {
		return <p>Loading testimonials...</p>;
	}
	return (
		<Parallax
			bgImage="/group3.jpeg"
			bgImageAlt="Event background"
			strength={900}
			bgImageStyle={{
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
				opacity: 0.8,
			}}
		>
			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12 text-white">What Our Audience Says</h2>
					<div className="hidden lg:grid lg:grid-cols-3 gap-8">
						{testimonials.map((testimonial) => (
							<TestimonialCard key={testimonial._id} testimonial={testimonial} />
						))}
					</div>
					<div className="lg:hidden flex overflow-x-auto space-x-4 snap-x snap-mandatory no-scrollbar p-2">
						{testimonials.map((testimonial) => (
							<TestimonialCard key={testimonial._id} testimonial={testimonial} />
						))}
					</div>
				</div>
			</section>
		</Parallax>
	);
}
