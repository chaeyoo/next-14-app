// app/booking/[memberId]/page.tsx
import { redirect } from 'next/navigation';

type Props = {
  params: { memberId: string };
};

export default function BookingMemberRootPage({ params }: Props) {
  const { memberId } = params;
  redirect(`/booking/${memberId}/consent`);
}
