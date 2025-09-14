import json
import os

def remove_short_desc(json_filename):
    # Get the directory where the script is located
    script_directory = os.path.dirname(os.path.abspath(__file__))
    # Construct the full path to the JSON file
    json_path = os.path.join(script_directory, json_filename)

    # Check if the file exists
    if not os.path.isfile(json_path):
        print(f"File not found: {json_path}")
        return

    # Load JSON content
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Recursive function to delete all "short_desc" fields
    def delete_short_desc(obj):
        if isinstance(obj, dict):
            if "short_desc" in obj:
                del obj["short_desc"]
            for v in obj.values():
                delete_short_desc(v)
        elif isinstance(obj, list):
            for item in obj:
                delete_short_desc(item)

    # Apply the cleanup
    delete_short_desc(data)

    # Save the modified JSON (overwrite the original file)
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print(f"Cleaned JSON saved to: {json_path}")


if __name__ == "__main__":
    json_filename = input("Enter the JSON filename to clean (e.g., data.json): ").strip()
    remove_short_desc(json_filename)
