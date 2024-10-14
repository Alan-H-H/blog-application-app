import { createClient } from '@supabase/supabase-js';

// Load environment variables (make sure to add them in your .env file)
const supabaseUrl = 'https://kcughgqrtsqxgakbfarv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjdWdoZ3FydHNxeGdha2JmYXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5Mzk5NDQsImV4cCI6MjA0NDUxNTk0NH0.rwWolyQEwfJgoUmLiGXTJ9DHdwAT1OWJOoyFHprQ83M';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
