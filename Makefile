.DEFAULT_GOLA := dev

.PHONY: dev test

dev: test
	bun run storybook

test:
	vitest run

build: test
	bun run build

