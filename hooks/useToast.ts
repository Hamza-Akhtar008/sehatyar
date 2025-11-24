"use client";

// This file now re-exports from the common ToastProvider component
import { useToast as useToastFromProvider } from '@/components/common/ToastProvider';

export const useToast = useToastFromProvider;
