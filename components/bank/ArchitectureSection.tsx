"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ArchitectureSection() {
    return (
        <section className="py-16 bg-muted/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Website Architecture
                        </h2>
                        <p className="text-muted-foreground text-lg mb-4">
                            The architecture integrates AWS Bedrock's Titan for embeddings and Claude 3 Haiku for chat response generation.
                            Pinecone is used to store and retrieve the most relevant data chunks via vector search.
                            This setup ensures fast, intelligent, and secure responses to user queries directly within the web app.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li>User sends query through web app</li>
                            <li>Query is embedded using Titan (AWS Bedrock)</li>
                            <li>Pinecone retrieves top matching chunks</li>
                            <li>Claude 3 generates a final response using context</li>
                            <li>Response is delivered to the web app</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        <Image
                            src="/images/architecture.jpg"
                            alt="Architecture diagram"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-xl border w-full h-auto"
                            priority
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
