import ProfileHeader from "./components/profile-header";
import WorkContent from "./components/work-content";

export default function MyWorks() {
  return (
    <div className="container mx-auto space-y-6 px-4 py-10">
      <ProfileHeader />
      <WorkContent />
    </div>
  );
}
