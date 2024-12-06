"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import GalleryForm from "@/components/GalleryForm";
import useFetchData from "@/hooks/useFetchData";

export default function GalleryPage() {
	const [openCreateGalleryModal, setOpenCreateGalleryModal] = useState(false);
	const { data: gallery, error, loading } = useFetchData("/api/gallery", "gallery");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	const handleEdit = (id) => {
		console.log("Edit item:", id);
	};

	const handleDelete = (id) => {
		console.log("Delete item:", id);
	};

	const handleCloseGalleryModal = () => {
		setOpenCreateGalleryModal(false);
	};

	const handleCreateGallery = () => {
		setOpenCreateGalleryModal(true);
	};

	return (
		<>
			<div className="text-right">
				<button onClick={handleCreateGallery} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Gallery Item
				</button>
			</div>
			<div className="max-w-3xl bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Media Type</TableHead>
							<TableHead>Media</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Alt</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{gallery.length > 0 ? (
							gallery.map((gallery) => (
								<TableRow key={gallery._id}>
									<TableCell className="font-semibold">{gallery.mediatype}</TableCell>
									<TableCell>{gallery.mediatype === "image" ? <Image src={gallery.media || "/placeholder.jpg"} width={200} height={200} alt={gallery.media || "alt"} className="w-16 h-16 rounded-full object-cover" /> : <video src={gallery.media} controls autoPlay className="w-24 h-32 object-cover" />} </TableCell>
									<TableCell>{gallery.category}</TableCell>
									<TableCell>{gallery.alt}</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button variant="ghost" size="icon" onClick={() => handleEdit(gallery.id)}>
												<Pencil className="w-6 h-6 text-blue-700" />
											</Button>
											<Button variant="ghost" size="icon" onClick={() => handleDelete(gallery.id)}>
												<Trash2 className="w-6 h-6 text-red-700" />
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={5} className="text-center">
									No gallery item/s found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{openCreateGalleryModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-white bg-red-700 p-4 mb-6 text-center">Create Gallery Item</h2>
						<GalleryForm handleCloseGalleryModal={handleCloseGalleryModal} fetchGallery={gallery} />
					</div>
				</div>
			)}
		</>
	);
}
