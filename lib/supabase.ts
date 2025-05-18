import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://aosttdzezofbyaimkdnd.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvc3R0ZHplem9mYnlhaW1rZG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5NzI1NzAsImV4cCI6MjA2MjU0ODU3MH0.CU1WYFnAMSGdIhPURtza6rwkukXhIk75DvzZZ6itlKg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
