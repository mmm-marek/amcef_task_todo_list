import { ChangeEvent, useState } from "react";
import { RadioInput } from "../common/RadioInput.component";

export type FilterCategory = "All" | "Active" | "Done" | "Overdue";

type FilterSectionProps = {
    onSearchChange: (searchValue: string) => void;
    onCategoryChange: (category: FilterCategory) => void;
    selectedFilterCategory: FilterCategory;
};

export const FilterSection = ({
    onSearchChange,
    onCategoryChange,
    selectedFilterCategory,
}: FilterSectionProps) => {
    // const [searchValue, setSearchValue] = useState("");
    // const [radioValue, setRadioValue] = useState("All" as FilterCategory);

    const isFilterCategory = (value: string): value is FilterCategory => {
        return (
            value === "All" ||
            value === "Active" ||
            value === "Done" ||
            value === "Overdue"
        );
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isFilterCategory(e.target.value)) {
            return;
        }
        onCategoryChange(e.target.value);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    return (
        <div className="flex flex-col items-center">
            <input
                type="text"
                placeholder="Type title..."
                className="input w-full max-w-xs input-bordered"
                onChange={(e) => handleSearchChange(e)}
            />
            <div className="flex gap-8 justify-center">
                <RadioInput
                    id="all"
                    label="All"
                    name="filter"
                    value="All"
                    checked={selectedFilterCategory === "All"}
                    onChange={handleRadioChange}
                />
                <RadioInput
                    id="active"
                    label="Active"
                    name="filter"
                    value="Active"
                    checked={selectedFilterCategory === "Active"}
                    onChange={handleRadioChange}
                />
                <RadioInput
                    id="done"
                    label="Done"
                    name="filter"
                    value="Done"
                    checked={selectedFilterCategory === "Done"}
                    onChange={handleRadioChange}
                />
                <RadioInput
                    id="overdue"
                    label="Overdue"
                    name="filter"
                    value="Overdue"
                    checked={selectedFilterCategory === "Overdue"}
                    onChange={handleRadioChange}
                />
            </div>
        </div>
    );
};
