"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface MobileFilterSheetProps {
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

export function MobileFilterSheet({
  selectedProfiles,
  selectedCameras,
  selectedScenarios,
  onProfileChange,
  onCameraChange,
  onScenarioChange,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false)

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

  const activeFiltersCount =
    selectedProfiles.length + selectedCameras.length + selectedScenarios.length

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 lg:hidden">
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-accent-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 border-border bg-sidebar">
        <SheetHeader>
          <SheetTitle className="text-sidebar-foreground">Filters</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
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
                        id={`mobile-profile-${profile}`}
                        checked={selectedProfiles.includes(profile)}
                        onCheckedChange={() =>
                          handleCheckboxChange(profile, selectedProfiles, onProfileChange)
                        }
                      />
                      <Label
                        htmlFor={`mobile-profile-${profile}`}
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
                        id={`mobile-camera-${camera}`}
                        checked={selectedCameras.includes(camera)}
                        onCheckedChange={() =>
                          handleCheckboxChange(camera, selectedCameras, onCameraChange)
                        }
                      />
                      <Label
                        htmlFor={`mobile-camera-${camera}`}
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
                        id={`mobile-scenario-${scenario}`}
                        checked={selectedScenarios.includes(scenario)}
                        onCheckedChange={() =>
                          handleCheckboxChange(scenario, selectedScenarios, onScenarioChange)
                        }
                      />
                      <Label
                        htmlFor={`mobile-scenario-${scenario}`}
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
