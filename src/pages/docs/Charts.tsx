import { Link } from "react-router-dom";
import { Wireframe } from "unicornial-ui";
import { Text } from "./ui";

export default function Charts() {
  return (
    <div className="flex flex-col gap-5">
      <Text>
        <strong>Coming soon.</strong> Unicornial UI doesn't include chart components yet, so
        there is nothing to import. This page will document them when they ship.
      </Text>
      {/* a sketch, not a preview of a real component */}
      <Wireframe className="max-w-md">
        <Wireframe.Block shape="text" width="35%" height={14} />
        <Wireframe.Row className="items-end">
          {[56, 104, 76, 132, 92, 120].map((height, i) => (
            <Wireframe.Block key={i} tone="fill" height={height} style={{ flex: 1 }} />
          ))}
        </Wireframe.Row>
        <Wireframe.Block shape="text" />
      </Wireframe>
      <Text>
        Meanwhile, see the <Link className="underline" to="/docs/components">components</Link>{" "}
        that are available today.
      </Text>
    </div>
  );
}
