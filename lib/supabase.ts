import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://efavlbldjynyxddmjets.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmYXZsYmxkanlueXhkZG1qZXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwNDE4NjgsImV4cCI6MjAzNTYxNzg2OH0.BuSVqrGeDtUmnZMopaIywMXACaYsAU-U6V7AQKtIG34";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
