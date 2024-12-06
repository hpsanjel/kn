"use client";

import React, { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import TestimonialForm from "@/components/TestimonialForm";

export default function TestimonialsPage() {
	const [openCreateTestimonialModal, setOpenCreateTestimonialModal] = useState(false);
	const { data: testimonials, error, loading } = useFetchData("/api/testimonials", "testimonials");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	const handleEdit = (id) => {
		console.log("Edit item:", id);
	};

	const handleDelete = (id) => {
		console.log("Delete item:", id);
	};

	const handleCloseTestimonialModal = () => {
		setOpenCreateTestimonialModal(false);
	};

	const handleCreateTestimonial = () => {
		setOpenCreateTestimonialModal(true);
	};

	return (
		<div className="max-w-4xl">
			<div className="text-right">
				<button onClick={handleCreateTestimonial} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Testimonial
				</button>
			</div>
			<div className=" bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Place</TableHead>
							<TableHead>Message</TableHead>
							<TableHead>Photo</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{testimonials.length > 0 ? (
							testimonials.map((testimonial) => (
								<TableRow key={testimonial.audiencename}>
									<TableCell className="w-48 font-semibold">{testimonial.audiencename}</TableCell>
									<TableCell className="w-48">{testimonial.audienceaddress}</TableCell>
									<TableCell className="w-72">{testimonial.audiencetestimony}</TableCell>
									<TableCell className="w-24">
										<Image src={testimonial.audienceimage || "/placeholder.jpg"} width={200} height={200} alt={testimonial.audiencename || "alt"} className="w-16 h-16 rounded-full object-cover" />
									</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial._id)}>
												<Pencil className="w-6 h-6 text-blue-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial._id)}>
												<Trash2 className="w-6 h-6 text-red-700" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									No events found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{openCreateTestimonialModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-white bg-red-700 p-4 mb-6 text-center">Create Testimonial</h2>
						<TestimonialForm handleCloseTestimonialModal={handleCloseTestimonialModal} fetchTestimonials={testimonials} />
					</div>
				</div>
			)}
		</div>
	);
}
