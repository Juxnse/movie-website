import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

export const supabase = createClient(
  'https://kkvqotzrpskekxftykbr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrdnFvdHpycHNrZWt4ZnR5a2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzMTIzMDEsImV4cCI6MjA2ODg4ODMwMX0.hCJFQI8SgC-wfMpxPI1CuiGBs8yNkUZ1YYWyMQQvXHQ'
);
