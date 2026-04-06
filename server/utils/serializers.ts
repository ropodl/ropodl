export function serializeMedia(item: any) {
  if (!item) return null

  return {
    id: item.id,
    filename: item.filename,
    mimeType: item.mime_type,
    fileUrl: item.file_url,
    sizeBytes: item.size_bytes,
    altText: item.alt_text,
    uploadedBy: item.uploaded_by,
    metadata: item.metadata ?? null,
    description: item.description ?? null,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export function serializeContact(item: any) {
  if (!item) return null

  return {
    id: item.id,
    name: item.name,
    email: item.email,
    subject: item.subject,
    message: item.message,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }
}

export function serializePortfolio(item: any) {
  if (!item) return null

  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    content: item.content,
    featuredImageId: item.featured_image_id,
    workTypeId: item.work_type_id,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    featuredImage: serializeMedia(item.featured_image),
    workType: item.work_type?.title ?? item.workType ?? null,
    workTypeRecord: item.work_type
      ? {
          id: item.work_type.id,
          title: item.work_type.title,
          slug: item.work_type.slug,
          description: item.work_type.description ?? null,
        }
      : null,
  }
}

export function serializeAuditLog(item: any) {
  if (!item) return null

  return {
    id: item.id,
    action: item.action ?? item.event ?? item.action_type ?? 'UNKNOWN',
    entity: item.entity ?? item.entity_type ?? item.table_name ?? 'unknown',
    entityId: item.entity_id ?? item.record_id ?? item.target_id ?? null,
    ipAddress: item.ip_address ?? item.ip ?? null,
    username: item.username ?? item.user_name ?? item.actor ?? null,
    createdAt: item.created_at ?? item.createdAt ?? item.timestamp ?? new Date().toISOString(),
  }
}
