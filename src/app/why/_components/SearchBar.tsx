import { Input } from "@/components/ui/input";

export default function SearchBar() {
    return (
      <div>
        <Input 
          type="search"
          placeholder="검색어를 입력하세요"
          enterKeyHint="search"
        />
      </div>
    );
  }