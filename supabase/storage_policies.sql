-- Storage policies — run after creating buckets: videos, thumbnails, certificates, branding

-- Videos: public read, authenticated write
create policy "Public read videos"
on storage.objects for select
using (bucket_id = 'videos');

create policy "Authenticated upload videos"
on storage.objects for insert
to authenticated
with check (bucket_id = 'videos');

create policy "Authenticated update videos"
on storage.objects for update
to authenticated
using (bucket_id = 'videos');

create policy "Authenticated delete videos"
on storage.objects for delete
to authenticated
using (bucket_id = 'videos');

-- Thumbnails
create policy "Public read thumbnails"
on storage.objects for select
using (bucket_id = 'thumbnails');

create policy "Authenticated upload thumbnails"
on storage.objects for insert
to authenticated
with check (bucket_id = 'thumbnails');

create policy "Authenticated update thumbnails"
on storage.objects for update
to authenticated
using (bucket_id = 'thumbnails');

create policy "Authenticated delete thumbnails"
on storage.objects for delete
to authenticated
using (bucket_id = 'thumbnails');

-- Certificates
create policy "Public read certificates"
on storage.objects for select
using (bucket_id = 'certificates');

create policy "Authenticated upload certificates"
on storage.objects for insert
to authenticated
with check (bucket_id = 'certificates');

create policy "Authenticated update certificates"
on storage.objects for update
to authenticated
using (bucket_id = 'certificates');

create policy "Authenticated delete certificates"
on storage.objects for delete
to authenticated
using (bucket_id = 'certificates');
