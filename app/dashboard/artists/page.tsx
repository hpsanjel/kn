"use client";

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import ArtistForm from "@/app/components/ArtistForm";

const mockArtists = [
	{
		id: 1,
		name: "Jyoti Magar",
		genre: "Modern",
		image: "/jyoti.jpeg",
		bio: "A modern Nepali singer known for her unique style and energetic performances.",
		totalsongs: 134,
		rating: 4.9,
		popularSongs: ["Timilai Dekhera", "Chirbir Chirbir", "Sakambari"],
		socialMedia: {
			facebook: "https://facebook.com/jyotimagar",
			instagram: "https://instagram.com/jyotimagar",
		},
		performanceCount: 150,
		contact: "jyotimagar@music.com",
		featured: true,
	},
	{
		id: 2,
		name: "Prakash Saput",
		genre: "Folk",
		image: "/prakashsaput.jpeg",
		bio: "A prominent figure in Nepali folk music with a message-driven style.",
		totalsongs: 160,
		rating: 4.8,
		popularSongs: ["Bol Maya", "Galbandi", "Mero Pani Haina Ra"],
		socialMedia: {
			facebook: "https://facebook.com/prakashsaput",
			instagram: "https://instagram.com/prakashsaput",
		},
		performanceCount: 200,
		contact: "contact@prakashsaput.com",
		featured: true,
	},
	{
		id: 3,
		name: "Samikshya Adhikari",
		genre: "Instrumental Folk",
		image: "/samikshya1.jpeg",
		bio: "A versatile instrumentalist blending traditional and modern folk tunes.",
		totalsongs: 150,
		rating: 4.9,
		popularSongs: ["Instrumental Magic", "Himalayan Echoes", "Arko kun hola"],
		socialMedia: {
			facebook: "https://facebook.com/samikshya",
			instagram: "https://instagram.com/samikshya",
		},
		performanceCount: 75,
		contact: "info@samikshya.com",
		featured: false,
	},
	{
		id: 4,
		name: "Melina Rai",
		genre: "Folk",
		image: "/melina.jpeg",
		bio: "Known for her melodious voice and heartwarming folk songs.",
		totalsongs: 134,
		rating: 4.5,
		popularSongs: ["Kutu Ma Kutu", "Timro Bhaka", "Dashain Tihar"],
		socialMedia: {
			facebook: "https://facebook.com/melinarai",
			instagram: "https://instagram.com/melinarai",
		},
		performanceCount: 120,
		contact: "melinarai@music.com",
		featured: true,
	},
];

export default function ArtistsPage() {
	const [openCreateArtistModal, setOpenCreateArtistModal] = useState(false);

	const handleView = (id: number) => {
		console.log("View item:", id);
	};

	const handleEdit = (id: number) => {
		console.log("Edit item:", id);
	};

	const handleDelete = (id: number) => {
		console.log("Delete item:", id);
	};

	const handleCloseArtistModal = () => {
		setOpenCreateArtistModal(false);
	};

	const handleCreateArtist = () => {
		setOpenCreateArtistModal(true);
	};

	return (
		<>
			<div className="text-right">
				<button onClick={handleCreateArtist} className="bg-red-800 text-white font-bold px-4 py-2 my-4">
					Create Artist
				</button>
			</div>
			<div className="bg-white rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Bio</TableHead>
							<TableHead>Genre</TableHead>
							<TableHead>Popular Songs</TableHead>
							<TableHead>Total Songs</TableHead>
							<TableHead>Performance Count</TableHead>
							<TableHead>Ratings</TableHead>
							<TableHead>Featured</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Social Media</TableHead>
							<TableHead>Image</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{mockArtists.map((artist) => (
							<TableRow key={artist.id}>
								<TableCell className="font-semibold">{artist.name}</TableCell>
								<TableCell className="max-w-48">{artist.bio}</TableCell>
								<TableCell>{artist.genre}</TableCell>
								<TableCell>
									{artist.popularSongs.map((song, id) => (
										<h4 key={id}>{song}</h4>
									))}
								</TableCell>
								<TableCell>{artist.totalsongs}</TableCell>
								<TableCell>{artist.performanceCount}</TableCell>
								<TableCell>{artist.rating}</TableCell>
								<TableCell>{artist.featured ? "Yes" : "No"}</TableCell>
								<TableCell>{artist.contact}</TableCell>
								<TableCell>
									{artist.socialMedia.facebook} <br />
									{artist.socialMedia.instagram}
								</TableCell>
								<TableCell>
									<Image src={artist.image} width={200} height={200} alt={artist.name} className="w-24 h-32 object-cover rounded-xl" />
								</TableCell>
								<TableCell>
									<div className="flex space-x-2">
										<Button variant="ghost" size="icon" onClick={() => handleView(artist.id)}>
											<Eye className="w-6 h-6 text-green-700" />
										</Button>
										<Button variant="ghost" size="icon" onClick={() => handleEdit(artist.id)}>
											<Pencil className="w-6 h-6 text-blue-700" />
										</Button>
										<Button variant="ghost" size="icon" onClick={() => handleDelete(artist.id)}>
											<Trash2 className="w-6 h-6 text-red-700" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			{openCreateArtistModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Create Artist</h2>
						<ArtistForm handleCloseArtistModal={handleCloseArtistModal} />
					</div>
				</div>
			)}
		</>
	);
}
