package api

import (
	"fmt"
	"testing"
)

func TestParserConfig(t *testing.T) {
	ParserConfig()
	if DbConfig.Host == "127.0.0.1" {
		fmt.Println("測試通過")
	}
}
