import { Input } from "@/components/ui/input";

interface SearchWithFilterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchWithFilter({ onChange }: SearchWithFilterProps) {
  return (
    <form className="w-full flex items-center rounded-md justify-center relative border-[1px] border-black border-opacity-20">
      <Input
        type="text"
        placeholder="Search Customer"
        className="py-6 rounded-md outline-none border-0 pr-16"
        onChange={onChange}
      />
      <button type="submit"></button>
      {/* <FilteringDialog data={data} /> */}
    </form>
  );
}
