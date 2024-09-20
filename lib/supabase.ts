import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dyialkbhwufpkambwaur.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5aWFsa2Jod3VmcGthbWJ3YXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4NjQzMjEsImV4cCI6MjA0MjQ0MDMyMX0.fogLytBih4ZnMsacLB9jWVbH2QqZdtVT14Vkz7_D8FA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})