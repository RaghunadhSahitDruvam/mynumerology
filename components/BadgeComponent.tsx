import React from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
const BadgeComponent = () => {
  const router = useRouter();
  return (
    <div>
      <Badge variant="default" onClick={() => router.push("/data")}>
        Saved Table
      </Badge>
    </div>
  );
};

export default BadgeComponent;
