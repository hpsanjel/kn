import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function TestimonialForm({ handleCloseTestimonialModal }) {
	const [formData, setFormData] = useState({
		audiencename: "",
		audienceaddress: "",
		audiencetestimony: "",
		audienceimage: null,
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			const form = new FormData();
			form.append("audiencename", formData.audiencename);
			form.append("audienceaddress", formData.audienceaddress);
			form.append("audiencetestimony", formData.audiencetestimony);
			if (formData.audienceimage) {
				form.append("audienceimage", formData.audienceimage);
			}

			const response = await fetch("/api/testimonials/create", {
				method: "POST",
				body: form,
			});

			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error || "Failed to create testimonial");
			}

			if (result.success) {
				toast.success("Testimonial created successfully!");
				setFormData({
					audiencename: "",
					audienceaddress: "",
					audiencetestimony: "",
					audienceimage: null,
				});
				// Reset image input
				const audienceImageInput = document.getElementById("audienceimage");
				if (audienceImageInput) {
					audienceImageInput.value = "";
				}
			}
		} catch (error) {
			setError(error.message);
			console.error("Error creating testimonial:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
			<div>
				<label htmlFor="audiencename" className="block mb-2 font-bold">
					Name
				</label>
				<input type="text" id="audiencename" value={formData.audiencename} onChange={(e) => setFormData({ ...formData, audiencename: e.target.value })} className="w-full p-2 border rounded" required />
			</div>
			<div>
				<label htmlFor="audienceaddress" className="block mb-2 font-bold">
					Address
				</label>
				<input type="text" id="audienceaddress" value={formData.audienceaddress} onChange={(e) => setFormData({ ...formData, audienceaddress: e.target.value })} className="w-full p-2 border rounded" required />
			</div>
			<div>
				<label htmlFor="audiencetestimony" className="block mb-2 font-bold">
					Message
				</label>
				<textarea id="audiencetestimony" value={formData.audiencetestimony} onChange={(e) => setFormData({ ...formData, audiencetestimony: e.target.value })} className="w-full p-2 border rounded" rows="4" required></textarea>
			</div>
			<div>
				<label htmlFor="audienceimage" className="block mb-2 font-bold">
					Photo
				</label>
				<input type="file" id="audienceimage" onChange={(e) => setFormData({ ...formData, audienceimage: e.target.files[0] })} className="w-full p-2 border rounded" required />
			</div>
			<div className="grid grid-cols-2 gap-2">
				<button type="submit" disabled={submitting} className={`w-full p-1.5 rounded ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} text-white font-bold`}>
					{submitting ? "Creating Testimonial..." : "Create Testimonial"}
				</button>
				<Button variant="outline" onClick={handleCloseTestimonialModal}>
					Close
				</Button>
			</div>
		</form>
	);
}