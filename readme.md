add something like this in your .zshrc

```sh
template_node_project() {
  if [ -z "$1" ]; then
    echo "Usage: create_node_project <project-name>"
    return 1
  fi

  local project_name="$1"
  local target_dir="./$project_name"
  local repo_url="https://github.com/nkaradzhov/template-node-redis-ts.git"  # or use SSH if preferred
  local temp_dir="/tmp/template-node-$$"

  if [ -d "$target_dir" ]; then
    echo "❌ Directory '$target_dir' already exists!"
    return 1
  fi

  echo "📦 Cloning template repo..."
  git clone --depth 1 "$repo_url" "$temp_dir" || {
    echo "❌ Failed to clone template"
    return 1
  }

  echo "🧹 Cleaning up .git history..."
  rm -rf "$temp_dir/.git"

  echo "🚚 Moving to $target_dir"
  mv "$temp_dir" "$target_dir"

  echo "📦 Installing dependencies..."
  cd "$target_dir" && npm install || {
    echo "❌ npm install failed"
    return 1
  }

  echo "✅ Project '$project_name' created successfully at $target_dir"
}
```
