import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fhwibqofohdhlpcwvcxc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZod2licW9mb2hkaGxwY3d2Y3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM2MDU2ODYsImV4cCI6MjAzOTE4MTY4Nn0.bnsRkLFOWRoF87PGJW7RY-OSkK9tKCneLZrUN5lsGlw';
export const supabase = createClient(supabaseUrl, supabaseKey);