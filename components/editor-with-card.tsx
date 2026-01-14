import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CodeEditorSample from "@/components/code-editor-sample";

export default function EditorWithCard() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{"< / > Code Editor"}</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeEditorSample width="100%" />
      </CardContent>
    </Card>
  );
}
