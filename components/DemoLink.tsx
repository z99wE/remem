'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DemoLink() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <Link
        href="/demo"
        className="block px-8 py-4 bg-yellow-400 text-[#00C853] font-black text-lg border-4 border-[#00C853] shadow-[8px_8px_0px_0px_rgba(0,200,83,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,200,83,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
      >
        RESTORE DEMO
      </Link>
    </motion.div>
  );
}

// Made with Bob
