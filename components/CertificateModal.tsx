import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    certificateName: string;
    certificateImage: string;
    issuer: string;
    date: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
    isOpen,
    onClose,
    certificateName,
    certificateImage,
    issuer,
    date
}) => {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative bg-paper max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-charcoal"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-stone-200">
                            <div>
                                <h3 className="font-serif text-2xl text-ink">{certificateName}</h3>
                                <p className="font-sans text-sm text-stone-500 mt-1">
                                    {issuer} • {date}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
                                aria-label="Close modal"
                            >
                                <X size={20} className="text-ink" />
                            </button>
                        </div>

                        {/* Certificate Image */}
                        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
                            <img
                                src={certificateImage}
                                alt={certificateName}
                                className="w-full h-auto rounded shadow-lg"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CertificateModal;
