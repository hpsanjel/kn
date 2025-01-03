import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
	return (
		<section id="about" className="py-12 sm:py-32 relative bg-slate-800">
			<div className="max-w-[1440px] mx-auto grid grid-col-1 place-items-center md:grid-cols-2">
				<div className="px-6 sm:mr-16 flex flex-col text-slate-200">
					<motion.div className="mb-6 w-full" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
						<h2 className="text-4xl font-bold mb-4">
							About <span className="text-red-500">KNS Entertainment</span>
						</h2>
						<p className="text-lg mb-6">KNS Entertainment is a premier event management company dedicated to bringing the vibrant culture of Nepal to audiences across Europe. With a focus on organizing unforgettable cultural programs and concerts, we showcase the best Nepalese artists and their performances.</p>
						<p className="text-lg mb-6">Our mission is to create a bridge between Nepal and Europe, fostering cultural exchange and providing a platform for Nepalese artists to share their talents with a wider audience.</p>
						<p className="text-lg mb-8">From traditional music and dance to contemporary fusion performances, we offer a diverse range of events that celebrate the rich heritage of Nepal while embracing modern artistic expressions.</p>
						<Link href="/about-us">
							<Button className="bg-red-700">Read More </Button>
						</Link>
					</motion.div>
				</div>
				<div className="w-full shadow-sm shadow-slate-100 ">
					<Image src="/group3.jpeg" alt="KNS Photo" width={400} height={400} className="w-full"></Image>
				</div>
			</div>
		</section>
	);
}
