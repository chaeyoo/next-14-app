"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [submittedText, setSubmittedText] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setSubmittedText(searchText);
      }
    };

    return (
      <div className="space-y-4">
        <Input 
          type="search"
          placeholder="검색어를 입력하세요"
          enterKeyHint="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {submittedText && (
          <div className="p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">검색어:</p>
            <p className="text-lg font-medium">{submittedText}</p>
          </div>
        )}
      </div>
    );
  }