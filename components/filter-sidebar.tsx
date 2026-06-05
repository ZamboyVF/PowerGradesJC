"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FilterSidebarProps {
  selectedProfiles: string[]
  selectedCameras: string[]
  selectedScenarios: string[]
  onProfileChange: (profiles: string[]) => void
  onCameraChange: (cameras: string[]) => void
  onScenarioChange: (scenarios: string[]) => void
}

const colorProfiles = ["RAW", "Log", "Rec.709", "HDR"]
const cameras = ["Apple ProRes", "Sony S-Log3", "Lumix V-Log", "ARRI LogC", "RED raw"]
const scenarios = ["Bar", "Nightclub", "Outdoors", "Studio", "Cinematic", "Vintage"]

export function FilterSidebar({
  selectedProfiles,
  selectedCameras,
  selectedScenarios,
  onProfileChange,
  onCameraChange,
  onScenarioChange,
}: FilterSidebarProps) {
  const handleCheckboxChange = (
    value: string,
    selectedValues: string[],
    onChange: (values: string[]) => void
  ) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar p-4">
      <h2 className="mb-4 text-sm font-semibold text-sidebar-foreground">Filter Templates</h2>
      
      <Accordion type="multiple" defaultValue={["profiles", "cameras", "scenarios"]} className="space-y-2">
        <AccordionItem value="profiles" className="border-sidebar-border">
          <AccordionTrigger className="py-2 text-sm text-sidebar-foreground hover:no-underline">
            Color Profiles
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <div className="space-y-2">
              {colorProfiles.map((profile) => (
                <div key={profile} className="flex items-center gap-2">
                  <Checkbox
                    id={`profile-${profile}`}
                    checked={selectedProfiles.includes(profile)}
                    onCheckedChange={() =>
                      handleCheckboxChange(profile, selectedProfiles, onProfileChange)
                    }
                  />
                  <Label
                    htmlFor={`profile-${profile}`}
                    className="text-sm font-normal text-sidebar-foreground cursor-pointer"
                  >
                    {profile}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cameras" className="border-sidebar-border">
          <AccordionTrigger className="py-2 text-sm text-sidebar-foreground hover:no-underline">
            Camera / Media
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <div className="space-y-2">
              {cameras.map((camera) => (
                <div key={camera} className="flex items-center gap-2">
                  <Checkbox
                    id={`camera-${camera}`}
                    checked={selectedCameras.includes(camera)}
                    onCheckedChange={() =>
                      handleCheckboxChange(camera, selectedCameras, onCameraChange)
                    }
                  />
                  <Label
                    htmlFor={`camera-${camera}`}
                    className="text-sm font-normal text-sidebar-foreground cursor-pointer"
                  >
                    {camera}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="scenarios" className="border-sidebar-border">
          <AccordionTrigger className="py-2 text-sm text-sidebar-foreground hover:no-underline">
            Scenarios
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <div className="space-y-2">
              {scenarios.map((scenario) => (
                <div key={scenario} className="flex items-center gap-2">
                  <Checkbox
                    id={`scenario-${scenario}`}
                    checked={selectedScenarios.includes(scenario)}
                    onCheckedChange={() =>
                      handleCheckboxChange(scenario, selectedScenarios, onScenarioChange)
                    }
                  />
                  <Label
                    htmlFor={`scenario-${scenario}`}
                    className="text-sm font-normal text-sidebar-foreground cursor-pointer"
                  >
                    {scenario}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
