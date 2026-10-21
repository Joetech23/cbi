import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JOBS, getJob } from '@/lib/jobs'
import ApplyForm from '@/components/careers/ApplyForm'

interface Props { params: Promise<{ role: string }> }

export async function generateStaticParams() {
  return JOBS.map(j => ({ role: j.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params
  const job = getJob(role)
  if (!job) return { title: 'Role not found · Care Best Initiative' }
  return {
    title: `Apply — ${job.title} | Care Best Initiative`,
    description: `Apply for the ${job.title} role at Care Best Initiative. ${job.location}. Applications close ${job.deadline}.`,
  }
}

export default async function ApplyPage({ params }: Props) {
  const { role } = await params
  const job = getJob(role)
  if (!job) notFound()
  return <ApplyForm job={job} />
}
